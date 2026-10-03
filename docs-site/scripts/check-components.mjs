import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";

// This checks React behavior in a DOM, not visual layout in a real browser.
const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "http://localhost", pretendToBeVisual: true });
for (const name of ["window", "document", "navigator", "HTMLElement", "HTMLInputElement", "HTMLTextAreaElement", "HTMLSelectElement", "HTMLButtonElement", "HTMLFormElement", "SVGElement", "Element", "Node", "NodeFilter", "Event", "MouseEvent", "KeyboardEvent", "MutationObserver", "DOMRect", "DocumentFragment", "CustomEvent", "File", "FileList", "getComputedStyle"]) {
  Object.defineProperty(globalThis, name, { configurable: true, writable: true, value: dom.window[name] });
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
globalThis.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window);
globalThis.cancelAnimationFrame = dom.window.cancelAnimationFrame.bind(dom.window);
globalThis.PointerEvent = dom.window.MouseEvent;
dom.window.PointerEvent = dom.window.MouseEvent;
let mobileViewport = false;
dom.window.matchMedia = (media) => ({ matches: mobileViewport && media.includes("max-width"), media, onchange: null, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return true; } });
dom.window.HTMLElement.prototype.scrollIntoView = function () {};
dom.window.HTMLElement.prototype.hasPointerCapture = () => false;
dom.window.HTMLElement.prototype.setPointerCapture = function () {};
dom.window.HTMLElement.prototype.releasePointerCapture = function () {};
dom.window.HTMLElement.prototype.scrollTo = function (options) { this.scrollLeft = options.left ?? this.scrollLeft; this.scrollTop = options.top ?? this.scrollTop; this.dispatchEvent(new dom.window.Event("scroll")); };
dom.window.HTMLElement.prototype.getBoundingClientRect = () => new dom.window.DOMRect(0, 0, 600, 300);
globalThis.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
dom.window.ResizeObserver = globalThis.ResizeObserver;

const React = await import("react");
const { render, screen, cleanup, within, waitFor } = await import("@testing-library/react");
const { default: userEvent } = await import("@testing-library/user-event");
const { PrimitiveDemo, primitiveExamples } = await import("../app/demos-primitives.tsx");
const { RadixDemo, radixExamples } = await import("../app/demos-radix.tsx");
const { AdvancedDemo, advancedExamples } = await import("../app/demos-advanced.tsx");
const { ComponentCatalog } = await import("../app/component-catalog.tsx");
const { DataTable } = await import("../components/ui/data-table.tsx");
const { DatePicker } = await import("../components/ui/date-picker.tsx");
const { Combobox } = await import("../components/ui/combobox.tsx");
const { Questionnaire } = await import("../components/ui/questionnaire.tsx");
const { Carousel, CarouselContent, CarouselItem, CarouselNext } = await import("../components/ui/carousel.tsx");
const { SidebarProvider, Sidebar, SidebarTrigger } = await import("../components/ui/sidebar.tsx");
const components = JSON.parse(await readFile(new URL("../app/component-data.json", import.meta.url), "utf8"));
const examples = { ...primitiveExamples, ...radixExamples, ...advancedExamples };
const errors = [];
const originalError = console.error;
console.error = (...args) => { errors.push(args.map(String).join(" ")); originalError(...args); };
const user = userEvent.setup({ document: dom.window.document });
const h = React.createElement;

try {
  for (const entry of components) {
    assert(examples[entry.name]?.includes("import "), `${entry.name}: missing usage example`);
    assert(!examples[entry.name].includes("@/src/"), `${entry.name}: invalid usage alias`);
    let container;
    try { ({ container } = render(h(React.Fragment, null, h(PrimitiveDemo, { name: entry.name }), h(RadixDemo, { name: entry.name }), h(AdvancedDemo, { name: entry.name })))); }
    catch (error) { throw new Error(`Failed to render ${entry.name}`, { cause: error }); }
    assert(container.innerHTML.length > 0, `${entry.name}: empty demo`);
    cleanup();
  }
  console.log(`Rendered all ${components.length} component previews and checked usage examples.`);

  render(h(DataTable, { data: [{ name: "Bia", age: 30 }, { name: "Ana", age: 25 }], columns: [{ id: "name", header: "Nome", accessorKey: "name" }, { id: "age", header: "Idade", accessorKey: "age" }] }));
  await user.click(screen.getByRole("button", { name: /Nome/ }));
  assert.match(document.querySelector("tbody tr").textContent, /Ana/);
  await user.type(screen.getByRole("textbox"), "Bia");
  assert.equal(document.querySelectorAll("tbody tr").length, 1);
  assert.match(document.querySelector("tbody tr").textContent, /Bia/);
  cleanup();

  let chosen;
  render(h(Combobox, { options: [{ value: "react", label: "React" }, { value: "vue", label: "Vue" }], onValueChange: (value) => { chosen = value; } }));
  const comboTrigger = screen.getByRole("combobox");
  await user.click(comboTrigger);
  assert.equal(document.getElementById(comboTrigger.getAttribute("aria-controls"))?.getAttribute("role"), "listbox");
  assert.equal(screen.getByRole("combobox", { name: "Buscar..." }).getAttribute("placeholder"), "Buscar...");
  await user.type(screen.getByPlaceholderText("Buscar..."), "Vue");
  await user.click(screen.getByRole("option", { name: /Vue/ }));
  assert.equal(chosen, "vue");
  assert.match(screen.getByRole("combobox").textContent, /Vue/);
  cleanup();

  let picked;
  render(h(DatePicker, { onValueChange: (value) => { picked = value; }, calendarProps: { defaultMonth: new Date(2026, 9, 1) } }));
  await user.click(screen.getByRole("button", { name: "Escolha uma data" }));
  const day = screen.getAllByRole("button").find((button) => button.textContent === "15");
  assert(day, "Calendar should expose date buttons");
  await user.click(day);
  assert(picked instanceof Date);
  assert.equal(picked.getDate(), 15);
  assert.match(screen.getByRole("button", { name: "Escolha uma data" }).textContent, /15\/10\/2026/);
  cleanup();

  let submitted;
  render(h(Questionnaire, { questions: [{ id: "tech", title: "Escolha uma tecnologia", type: "single", required: true, options: [{ value: "react", label: "React" }] }, { id: "note", title: "Conte sua ideia", type: "text", required: true }], onComplete: (answers) => { submitted = answers; } }));
  await user.click(screen.getByRole("button", { name: /Continuar/ }));
  assert.match(screen.getByRole("alert").textContent, /Responda/);
  await user.click(screen.getByRole("radio", { name: "React" }));
  await user.click(screen.getByRole("button", { name: /Continuar/ }));
  await user.type(screen.getByRole("textbox", { name: "Conte sua ideia" }), "Um catálogo completo");
  await user.click(screen.getByRole("button", { name: "Concluir" }));
  assert.deepEqual(submitted, { tech: "react", note: "Um catálogo completo" });
  assert.match(screen.getByRole("status").textContent, /Respostas enviadas/);
  cleanup();

  submitted = undefined;
  render(h(Questionnaire, { questions: [{ id: "tech", title: "Tecnologia atual", type: "single", required: true, options: [{ value: "react", label: "React" }] }], defaultAnswers: { tech: "removed-option" }, onComplete: (answers) => { submitted = answers; } }));
  await user.click(screen.getByRole("button", { name: "Concluir" }));
  assert.equal(submitted, undefined);
  assert.match(screen.getByRole("alert").textContent, /Responda/);
  await user.click(screen.getByRole("radio", { name: "React" }));
  await user.click(screen.getByRole("button", { name: "Concluir" }));
  assert.deepEqual(submitted, { tech: "react" });
  cleanup();

  submitted = undefined;
  render(h(Questionnaire, { questions: [{ id: "tech", title: "Tecnologias", type: "multiple", required: true, options: [{ value: "react", label: "React" }] }], defaultAnswers: { tech: ["react", "removed-option", "react"], obsolete: "removed question" }, onComplete: (answers) => { submitted = answers; } }));
  await user.click(screen.getByRole("button", { name: "Concluir" }));
  assert.deepEqual(submitted, { tech: ["react"] });
  cleanup();

  let slide;
  const carousel = render(h(Carousel, { onIndexChange: (value) => { slide = value; } }, h(CarouselContent, null, h(CarouselItem, null, "Primeiro"), false, h(CarouselItem, null, "Segundo"), h(CarouselItem, null, "Terceiro")), h(CarouselNext)));
  const viewport = screen.getByText("Primeiro").parentElement;
  Object.defineProperty(viewport, "clientWidth", { value: 300 });
  await user.click(screen.getByRole("button", { name: "Próximo slide" }));
  assert.equal(slide, 1);
  await user.click(screen.getByRole("button", { name: "Próximo slide" }));
  assert.equal(slide, 2);
  carousel.rerender(h(Carousel, { onIndexChange: (value) => { slide = value; } }, h(CarouselContent, null, h(CarouselItem, null, "Primeiro"), false), h(CarouselNext)));
  assert.equal(slide, 0);
  assert(screen.getByText("Slide 1 de 1"));
  assert.equal(screen.getByRole("button", { name: "Próximo slide" }).disabled, true);
  cleanup();

  mobileViewport = true;
  render(h(SidebarProvider, null, h(Sidebar, null, h("button", null, "Projeto")), h(SidebarTrigger)));
  const sidebarTrigger = screen.getByRole("button", { name: "Alternar navegação" });
  await user.click(sidebarTrigger);
  assert(screen.getByRole("dialog"));
  await user.keyboard("{Escape}");
  await waitFor(() => assert.equal(document.activeElement, sidebarTrigger));
  mobileViewport = false;
  cleanup();

  render(h(ComponentCatalog));
  const nav = screen.getByRole("navigation", { name: "Catálogo de componentes" });
  assert.equal(within(nav).getAllByRole("button").length, 65);
  await user.type(screen.getByRole("searchbox", { name: "Buscar componentes" }), "questionnaire");
  assert.equal(within(nav).getAllByRole("button").length, 1);
  await user.click(within(nav).getByRole("button", { name: "Questionnaire" }));
  assert.equal(screen.getByRole("heading", { name: "Questionnaire" }).textContent, "Questionnaire");
  await user.click(screen.getByRole("tab", { name: "Como usar" }));
  assert.match(screen.getByRole("tabpanel").textContent, /Questionnaire/);
  await user.keyboard("{ArrowRight}");
  assert.equal(screen.getByRole("tab", { name: "Código-fonte" }).getAttribute("aria-selected"), "true");
  cleanup();
  assert.equal(errors.length, 0, errors.join("\n"));
  console.log("Interactions passed: table sorting/filtering, combobox/ARIA, callback-only date picker, questionnaire validation/submission, changing carousel slides, mobile sidebar focus, catalog search/tabs/keyboard.");
} finally {
  cleanup();
  console.error = originalError;
  dom.window.close();
}
