import { rateLimit } from 'express-rate-limit'

const generalLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 10,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

const generalLimiterProducts = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 150,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

const generalLimiterAdmin = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

export {generalLimiter,generalLimiterProducts,generalLimiterAdmin};