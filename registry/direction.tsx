"use client";

import { DirectionProvider as PrimitiveDirectionProvider, useDirection as usePrimitiveDirection } from "@radix-ui/react-direction";

/** Shares reading direction with Radix components. Also set dir on your page or container. */
export const DirectionProvider = PrimitiveDirectionProvider;
export const Direction = PrimitiveDirectionProvider;
export const useDirection = usePrimitiveDirection;
