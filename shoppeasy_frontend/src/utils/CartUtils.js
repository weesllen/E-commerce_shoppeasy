
function generateRandomAlphaNumeric(length = 10){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz123456789';
    let result = '';
        for(let i = 0; i < length; i++){
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];   
        }
        return result

}

function getOrCreateCartCode() {
    let cart_code = localStorage.getItem('cart_code');
    if (!cart_code) {
      cart_code = generateRandomAlphaNumeric();
      localStorage.setItem('cart_code', cart_code);
    }
    return cart_code;
}

export { generateRandomAlphaNumeric, getOrCreateCartCode };
// export const randomValue = generateRandomAlphaNumeric();