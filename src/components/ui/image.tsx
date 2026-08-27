import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, loading = 'lazy', decoding = 'async', ...rest }, ref) => {
    return (
      <img
        {...rest}
        ref={ref}
        className={cn('bg-gray-100', className)}
        loading={loading}
        decoding={decoding}
      />
    )
  },
)

Image.displayName = 'Image'

export default Image
