export const BGADPRequestGet = (path) => {
 return requestGet(path)
}

async function requestGet(route) {
const setUrl = `https://api.mercadolibre.com/${route}`;
try {
    const response = await fetch(setUrl)
    return response.json();
} catch (error) {
    console.log("Algo salió mal");
}
}