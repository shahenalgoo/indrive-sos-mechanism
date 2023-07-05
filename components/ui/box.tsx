//React
import React from 'react';

// Utils
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/override-classes';

const boxVariants = cva(
    'shrink-0 relative',
    {
        variants: {
            variant: {
                solid: 'bg-neutral-950 text-white',
                border: 'border border-border',
                white: 'bg-white dark:bg-neutral-900'
            },
            rounded: {
                default: 'rounded-lg',
                xl: 'rounded-xl'
            },
            space: {
                default: 'p-4',
                sm: 'p-2',
                none: 'p-0'
            }
        },
        defaultVariants: {
            variant: 'solid',
            rounded: 'default',
            space: 'default'
        }
    }
)

export interface Props
    extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof boxVariants> { }


const Box = ({ className, children, variant, rounded, space, ...props }: Props) => {
    return (
        <div className={cn(boxVariants({ className, variant, rounded, space }))} {...props}>
            {children}
        </div>
    )
}

export default Box;