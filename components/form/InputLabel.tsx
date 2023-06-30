// React
import React from 'react';

// Utils
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/override-classes';

const inputLabelVariants = cva(
    'block mb-2 text-sm',
    {
        variants: {
            variant: {
                default: 'text-black dark:text-neutral-500 font-medium',
                lighter: 'text-slate-300'
            }
        },
        defaultVariants: {
            variant: 'default'
        }
    }
)

export interface Props
    extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof inputLabelVariants> { }


const InputLabel = ({ className, children, variant, ...props }: Props) => {
    return (
        <label
            className={cn(inputLabelVariants({ className, variant }))}
            {...props}
        >
            {children}
        </label>
    )
}

export default InputLabel;