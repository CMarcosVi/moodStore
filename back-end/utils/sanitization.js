const sanitizeName = (name) => {
    const str_transforme = String(name).trim();
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s]+$/;

    if (!regex.test(str_transforme)) {
        throw new Error('Nome inválido. Apenas letras, números, acentos e espaços são permitidos.');
    }
    if (/<script.*?>.*?<\/script>/i.test(str_transforme)) {
        throw new Error('Nome contém código de script inválido.');
    }
    return str_transforme;
}

function sanitizeFloat(value) {
    const floatValue = parseFloat(value);
    if (isNaN(floatValue)) {
        return null;
    }
    return floatValue;
}


const sanitizePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!regex.test(password)) {
        throw new Error('Senha inválida. A senha deve ter no mínimo 8 caracteres, incluindo 1 letra e 1 número.');
    }
    if (/<script.*?>.*?<\/script>/i.test(password)) {
        throw new Error('Senha contém código de script inválido.');
    }
    return password;
}

const sanitizeTextMessage = (message) => {
    const regex = /^[a-zA-Z0-9\s.,!?'-]+$/;
    if (!regex.test(message)) {
        throw new Error('Mensagem contém caracteres inválidos.');
    }
    if (/<script.*?>.*?<\/script>/i.test(message)) {
        throw new Error('Mensagem contém código de script inválido.');
    }
    return message.trim();
}

const sanitizeEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
        throw new Error('E-mail inválido.');
    }
    if (/<script.*?>.*?<\/script>/i.test(email)) {
        throw new Error('E-mail contém código de script inválido.');
    }
    return email.toLowerCase(); 
}

const sanitizeID = (id) => {
    const regex = /^[1-9][0-9]{0,6}$/;
    if (!regex.test(id)) {
        throw new Error('ID inválido. O ID deve ser um número válido de até 7 dígitos.');
    }
    if (/<script.*?>.*?<\/script>/i.test(id)) {
        throw new Error('ID contém código de script inválido.');
    }
    return id;
}

const sanitizeNumber = (value) => {
    const sanitizedValue = parseInt(value);
    
    if (isNaN(sanitizedValue)) {
        throw new Error("Valor inválido, não é um número.");
    }

    if (!Number.isInteger(sanitizedValue)) {
        console.warn("Valor não é inteiro, foi arredondado.");
        sanitizedValue = Math.round(sanitizedValue);
    }

    return sanitizedValue;
};


export default {
    sanitizeName,
    sanitizePassword,
    sanitizeTextMessage,
    sanitizeEmail,
    sanitizeID,
    sanitizeNumber,
    sanitizeFloat
}
