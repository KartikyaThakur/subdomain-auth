import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { environment } from 'src/environment';

var cookieExtractor = function(req) {        
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies[environment.token_key];
    }
    return token;
};


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: cookieExtractor,
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }
    
    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}