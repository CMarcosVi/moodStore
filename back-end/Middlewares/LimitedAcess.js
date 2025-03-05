import { rateLimit } from 'express-rate-limit'

const generalLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutos
    max: 10, // Limite de 5 requisições por IP
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

const generalLimiterProducts = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 150, // Limite de 5 requisições
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

const generalLimiterAdmin = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 50, // Limite de 5 requisições
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

export default {generalLimiter,generalLimiterProducts,generalLimiterAdmin};