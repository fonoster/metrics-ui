import React from 'react'

import { classes } from '@/helpers/classes'

export const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={classes('container', className)} {...props} />
