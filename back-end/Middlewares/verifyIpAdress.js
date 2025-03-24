import ip from 'ip'

const trustedIps = ['', '']; 

const verifyIP = () => {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    const realIp = clientIp.split(',')[0].trim();
  
    console.log(`IP da requisição: ${realIp}`);
  
    if (trustedIps.includes(realIp) || ip.cidrSubnet('192.168.1.0/24').contains(realIp)) {
      return next();
    } else {
      return res.status(403).json({ message: 'Acesso negado: IP não autorizado.' });
    }
}

export default verifyIP;