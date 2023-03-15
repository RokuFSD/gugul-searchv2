function classSelector(base: string[], variants: { [key: string]: string[] }) {
  return (variant: keyof typeof variants) => base.concat(variants[variant]).join(" ");
}

export default classSelector