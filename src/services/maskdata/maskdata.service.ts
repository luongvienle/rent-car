import { Injectable } from '@nestjs/common';
import { JsonMaskOptions, maskJSONFields } from 'maskdata';

@Injectable()
export class MaskdataService {
  mask(jsonObject: any) {
    const options: JsonMaskOptions = {
      maskWith: '*',
      fields: [
        'email',
        'password',
        'phone',
        'access_token',
        'data.email',
        'data.password',
        'data.phone',
        'data.access_token',
      ],
    };
    return maskJSONFields(jsonObject, options);
  }
}
