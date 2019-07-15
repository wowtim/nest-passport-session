import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    var sessionExtractor = function(req) {
      var token = null;
      console.log('session extractor');
      console.log(req.session);
      if (req && req.session) {
          token = req.session['passport']['access_token'];
      }
      console.log('token');
      console.log(token);
      return token;
   };


    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        sessionExtractor,
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    console.log("jwt validate");
    console.log(payload);
    return { userId: payload.sub, username: payload.username };
  }
}
