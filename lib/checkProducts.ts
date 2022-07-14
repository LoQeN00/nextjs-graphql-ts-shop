export const checkProducts = async () => {
    const take = 2500
    let offset = 0
    let products = 0
    let flag = true

    while (flag) {
        const res = await fetch(`https://naszsklep-api.vercel.app/api/products?take=${take}&offset=${offset}`)
        const data = await res.json()
        if (data.length === 0) {
            flag = false
            break
        }
        products += data.length
        offset += take
    }    

    return products
}