import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";

import { MambuModule } from "./mambu.module";

describe("MambuModule", ()=>{
  let app: INestApplication;

  beforeEach(async ()=>{
    const moduleFixture = await Test.createTestingModule({
      imports: [MambuModule]
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  
  it('should be defined', () => {
    expect(app).toBeDefined();
  });
});