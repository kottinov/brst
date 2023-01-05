import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { parseString } from 'xml2js';

@Injectable()
export class DronesService {
  async getDrones(): Promise<any> {
    const response = await axios.get(
      'https://assignments.reaktor.com/birdnest/drones',
    );
    const xml = response.data.toString();
    let drones = [];
    parseString(xml, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        drones = result;
      }
    });
    return drones;
  }
}
