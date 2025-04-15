
function generateRandomAlphaNumeric(length = 10){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz123456789';
    let result = '';
        for(let i = 0; i < length; i++){
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];   
        }
        return result

}
export const randomValue = generateRandomAlphaNumeric();