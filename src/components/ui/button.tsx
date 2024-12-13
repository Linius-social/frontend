"use client";

import type { ButtonProps as ChakraButtonProps, RecipeVariantProps } from "@chakra-ui/react"
import {
  AbsoluteCenter,
  Button as ChakraButton,
  Span,
  Spinner,
  RecipeCompoundVariant,
  defineRecipe,
  useRecipe
} from "@chakra-ui/react"
import * as React from "react"

export const buttonRecipe = defineRecipe({
  base: {
    display: "flex",
  },
  variants: {
    visual: {
      solid: { bg: "red.500", color: "white" },
      outline: { borderWidth: "1px", borderColor: "red.200" },
    },
  },
  defaultVariants: {
    visual: "solid",
  }
})

interface ButtonLoadingProps {
  loading?: boolean
  loadingText?: React.ReactNode
}

export interface ButtonProps extends ChakraButtonProps, ButtonLoadingProps, RecipeVariantProps<typeof buttonRecipe> { }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { loading, disabled, loadingText, children, ...rest } = props
    const recipe = useRecipe({ recipe: buttonRecipe })
    const styles = recipe({ ...props, loading })

    return (
      <ChakraButton disabled={loading || disabled} css={styles} ref={ref} {...rest}>
        {loading && !loadingText ? (
          <>
            <AbsoluteCenter display="inline-flex">
              <Spinner size="inherit" color="inherit" />
            </AbsoluteCenter>
            <Span opacity={0}>{children}</Span>
          </>
        ) : loading && loadingText ? (
          <>
            <Spinner size="inherit" color="inherit" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </ChakraButton>
    )
  },
)
