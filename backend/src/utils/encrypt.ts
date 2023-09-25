import crypto from 'crypto';

export function hashInputText(text: string) {
    const random = crypto.randomBytes(128).toString('base64');
    return crypto.createHmac('sha256', text).update(random).digest('hex');
}

console.log(hashInputText('Ala ma kota'));
