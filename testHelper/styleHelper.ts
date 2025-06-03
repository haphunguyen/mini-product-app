export const flatStyle = (style: any) => {
    if (style?.length >= 1) style = style.flat()
    else style = [style]
    return style.reduce((acc: any, cur: any) => ({ ...acc, ...cur }), {})
}