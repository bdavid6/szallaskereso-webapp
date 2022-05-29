import { app } from '../src/app';
import supertest from 'supertest';

describe('Szálláskereső', () => {
  const user1 = { username: 'username', password: 'password', name: 'name', e_mail: 'email', role: 'ADMIN' };
  const user2 = { username: 'username', password: 'password', name: 'name', e_mail: 'another email', role: 'ADMIN' };
  const user3 = { username: 'another username', password: 'password', name: 'name', e_mail: 'email', role: 'ADMIN' };
  const member1 = { username: 'member1', password: 'password1', name: 'name1', e_mail: 'email1', role: 'MEMBER' };
  const member2 = { username: 'member2', password: 'password2', name: 'name2', e_mail: 'email2', role: 'MEMBER' };

  const notregistereduser = { username: 'un', password: 'pw', name: 'name', e_mail: 'em', role: 'MEMBER' };
  const user1wrongpassword = { username: 'username', password: 'wrongpassword', name: 'name', e_mail: 'email', role: 'ADMIN' };

  let requestHandle: supertest.SuperTest<supertest.Test>;

  beforeEach(() => {
    requestHandle = supertest(app);
  });

  describe('Authentication', () => {
    it('should register', async () => {
      await requestHandle.post('/auth/register').send(user1).expect(200);
    });

    it('should fail on same username registration', async () => {
      await requestHandle.post('/auth/register').send(user2).expect(409);
    });

    it('should fail on same email registration', async () => {
      await requestHandle.post('/auth/register').send(user3).expect(408);
    });

    it('should login with registered user', async () => {
      await requestHandle.post('/auth/login').send(user1).expect(200);
    });

    it('should not login with not registered username', async () => {
      await requestHandle.post('/auth/login').send(notregistereduser).expect(401);
    });

    it('should not login with correct username and wrong password', async () => {
      await requestHandle.post('/auth/login').send(user1wrongpassword).expect(401);
    });

    it('should register', async () => {
      await requestHandle.post('/auth/register').send(member1).expect(200);
    });

    it('should register', async () => {
      await requestHandle.post('/auth/register').send(member2).expect(200);
    });
  });

  //A seeds/testSeed.sql létrehozott adatok kerülnek ellenőrzésre

  describe('Message Controller', () => {
    let token1: string;
    let token2: string;
    //let time: Date;
    let createdMessage: object;
    beforeAll(() => {
      //time = new Date();
      //jest.useFakeTimers('modern');
      //jest.setSystemTime(time);
      createdMessage = {
        id: 1,
        text1: 'text1',
        text2: 'text2',
        createdAt: '2022',
        user: 4 //seederben lévő felhasználókat is figyelembe kell venni,
        // valamint a teszt elején létrehozottakat is
      };
    });
    /*afterAll(() => {
      jest.useRealTimers();
    });*/

    beforeEach(async () => {
      const loginResponse1 = await requestHandle.post('/auth/login').send(member1);
      token1 = `Bearer ${loginResponse1.body.token}`;
      const loginResponse2 = await requestHandle.post('/auth/login').send(member2);
      token2 = `Bearer ${loginResponse2.body.token}`;
    });

    describe('/messages', () => {
      it('should not return when user is not provided', async () => {
        await requestHandle.get('/messages').expect(401);
      });

      it('should return a message - user has a message', async () => {
        await requestHandle
          .get('/messages')
          .set('Authorization', token1)
          .expect(200)
          .expect([{
            ...
            createdMessage,
          }]);
      });

      it('should return empty array - this user has no messages', async () => {
        await requestHandle
          .get('/messages')
          .set('Authorization', token2)
          .expect(200)
          .expect([]);
      });

      it('should delete the users first message', async () => {
        await requestHandle
          .delete('/messages/1')
          .set('Authorization', token2)
          .expect(200)
      });

      it('should not delete a message - user has none', async () => {
        await requestHandle
          .delete('/messages/1')
          .set('Authorization', token1)
          .expect(409)
      });
    });
  });


  describe('Search Controller', () => {
    let createdSearch1: object;
    let createdSearch2: object;
    beforeAll(() => {
      //time = new Date();
      //jest.useFakeTimers('modern');
      //jest.setSystemTime(time);
      createdSearch1 = [
        {
          id: 1,
          name: 'name',
          place: 'place',
          phone_number: 123456789,
          description: 'Longer description',
          information: 'Infos',
          services: ['ingyen wifi', 'medence', 'saját parkoló', 'légkondi'],
          res_end_date: '2022-10-01T00:00:00.000Z',
          adult_price: 20000,
          child_price: 10000,
          image: 'imagepath',
          active: true,
          confirmed: true,
          user: 1
        }
      ];

      createdSearch2 = [
        {
          id: 1,
          name: 'name',
          place: 'place',
          phone_number: 123456789,
          description: 'Longer description',
          information: 'Infos',
          services: ['ingyen wifi', 'medence', 'saját parkoló', 'légkondi'],
          res_end_date: '2022-10-01T00:00:00.000Z',
          adult_price: 20000,
          child_price: 10000,
          image: 'imagepath',
          active: true,
          confirmed: true,
          user: 1
        },
        {
          id: 2,
          name: 'name2',
          place: 'place2',
          phone_number: 123456789,
          description: 'Longer description',
          information: 'Infos',
          services: ['ingyen wifi', 'medence', 'saját parkoló', 'légkondi'],
          res_end_date: '2022-10-01T00:00:00.000Z',
          adult_price: 20000,
          child_price: 10000,
          image: 'imagepath',
          active: true,
          confirmed: true,
          user: 1
        },
        {
          id: 3,
          name: 'name3',
          place: 'place3',
          phone_number: 123456789,
          description: 'Longer description',
          information: 'Infos',
          services: ['ingyen wifi', 'medence', 'saját parkoló', 'légkondi'],
          res_end_date: '2025-10-01T00:00:00.000Z',
          adult_price: 20000,
          child_price: 10000,
          image: 'imagepath',
          active: true,
          confirmed: true,
          user: 1
        }
      ];

    });

    describe('/search', () => {
      it('should return all accommoddations', async () => {
        await requestHandle
          .get('/search')
          .expect(200)
          .expect((res) => {
            expect(res.body).toEqual(
              createdSearch2
            );
          });
      });
    });
  });


  describe('Reservation Controller', () => {
    let token1: string;
    let token2: string;
    //let time: Date;
    let createdReservation: object;
    beforeAll(() => {
      //time = new Date();
      //jest.useFakeTimers('modern');
      //jest.setSystemTime(time);
      createdReservation = {
        id: 1,
        start_date: '2022-05-08',
        end_date: '2022-05-15',
        adults: 2,
        children: 1,
        user: 2,
        accommodation: 3
      };
    });
    /*afterAll(() => {
      jest.useRealTimers();
    });*/

    beforeEach(async () => {
      const loginResponse1 = await requestHandle.post('/auth/login').send(member1);
      token1 = `Bearer ${loginResponse1.body.token}`;
      const loginResponse2 = await requestHandle.post('/auth/login').send(member2);
      token2 = `Bearer ${loginResponse2.body.token}`;
    });

    describe('/reservations', () => {
      it('should not return when user is not provided', async () => {
        await requestHandle.get('/reservations').expect(401);
      });

      it('should reserve an accommodation', async () => {
        await requestHandle
          .post('/reservations/accommodation/1')
          .send(
            {
              start_date: 'startdate',
              end_date: 'enddate',
              adults: 2,
              children: 2
            }
          )
          .set('Authorization', token1)
          .expect(200);
      });

      it('should not reserve an accommodation', async () => {
        await requestHandle
          .post('/reservations/accommodation/1')
          .send(
            {
              start_date: 'startdate',
              end_date: 'enddate',
              adults: 2,
              children: 2,
            }
          )
          .set('Authorization', token1)
          .expect(409);
      });

      it('should check one of your accommodations reservations', async () => {
        await requestHandle
          .get('/reservations/accommodation/3')
          .set('Authorization', token2)
          .expect(200)
          .expect([createdReservation]);
      });
    });
  });

  describe('Accommodation Controller', () => {
    let token1: string;
    let token2: string;
    //let time: Date;
    let createdAccommodation: object;
    beforeAll(() => {
      //time = new Date();
      //jest.useFakeTimers('modern');
      //jest.setSystemTime(time);
      createdAccommodation = {
        id: 1,
        name: 'name',
        place: 'place',
        phone_number: 123456789,
        description: 'Longer description',
        information: 'Infos',
        services: ['ingyen wifi', 'medence', 'saját parkoló', 'légkondi'],
        res_end_date: '2022-10-01T00:00:00.000Z',
        adult_price: 20000,
        child_price: 10000,
        image: 'imagepath',
        active: true,
        confirmed: true,
        user: 1
      };
    });
    /*afterAll(() => {
      jest.useRealTimers();
    });*/

    beforeEach(async () => {
      const loginResponse1 = await requestHandle.post('/auth/login').send(member1);
      token1 = `Bearer ${loginResponse1.body.token}`;
      const loginResponse2 = await requestHandle.post('/auth/login').send(member2);
      token2 = `Bearer ${loginResponse2.body.token}`;
    });

    describe('/accommodations', () => {
      it('should not return when user is not provided', async () => {
        await requestHandle.get('/accommodations').expect(401);
      });

      it('should return an accommodation', async () => {
        await requestHandle
          .get('/accommodations/1')
          .set('Authorization', token1)
          .expect(200)
          .expect(createdAccommodation);
      });

      it('should not find an accommodation', async () => {
        await requestHandle
          .get('/accommodations/100')
          .set('Authorization', token1)
          .expect(404);
      });

      it('should inactivate an accommodation', async () => {
        await requestHandle
          .put('/accommodations/1')
          .send()
          .set('Authorization', token1)
          .expect(200);
      });

      it('should activate back the accommodation', async () => {
        await requestHandle
          .put('/accommodations/1')
          .send()
          .set('Authorization', token1)
          .expect(200);
      });

      it('should not find and accommodation to in/activate', async () => {
        await requestHandle
          .put('/accommodations/100')
          .send()
          .set('Authorization', token1)
          .expect(409);
      });

      it('should delete an accommodation', async () => {
        await requestHandle
          .delete('/accommodations/2')
          .set('Authorization', token1)
          .expect(200);
      });

      it('should confirm an accommodaiton', async () => {
        await requestHandle
          .put('/accommodations/confirm/3')
          .send()
          .set('Authorization', token1)
          .expect(200);
      });

      it('should not find an accommodation to confirm', async () => {
        await requestHandle
          .put('/accommodations/confirm/30')
          .send()
          .set('Authorization', token1)
          .expect(409);
      });
    });
  });

  describe('User Controller', () => {
    let token1: string;
    let token2: string;
    //let time: Date;
    let createdUser: object;
    let createdUser2: object;
    beforeAll(() => {
      //time = new Date();
      //jest.useFakeTimers('modern');
      //jest.setSystemTime(time);
      createdUser = {
        id: 1,
        username: 'pelda',
        name: 'Példa',
        e_mail: 'pelda@pelda',
        role: 'MEMBER'
      }
      createdUser2 = [
        { "e_mail": "pelda@pelda", "id": 1, "name": "Példa", "reservations": [], "role": "MEMBER", "username": "pelda" },
        {
          "e_mail": "pelda2@pelda", "id": 2, "name": "Példa2", "reservations": [{
            "accommodation": 3, "adults": 2, "children": 1, "end_date": "2022-05-15", "id": 1, "start_date": "2022-05-08", "user": 2
          }], "role": "MEMBER", "username": "pelda2"
        },
        { "e_mail": "email", "id": 3, "name": "name", "reservations": [], "role": "MEMBER", "username": "username" },
        { "e_mail": "email1", "id": 4, "name": "name1", "reservations": [{ "accommodation": 1, "adults": 2, "children": 2, "end_date": "enddate", "id": 2, "start_date": "startdate", "user": 4 }], "role": "MEMBER", "username": "member1" },
        { "e_mail": "email2", "id": 5, "name": "name2", "reservations": [], "role": "MEMBER", "username": "member2" }]

    });

    beforeEach(async () => {
      const loginResponse1 = await requestHandle.post('/auth/login').send(member1);
      token1 = `Bearer ${loginResponse1.body.token}`;
      const loginResponse2 = await requestHandle.post('/auth/login').send(member2);
      token2 = `Bearer ${loginResponse2.body.token}`;
    });

    describe('/users', () => {
      it('should not return when user is not provided', async () => {
        await requestHandle.get('/users').expect(401);
      });

      it('should return users', async () => {
        await requestHandle
          .get('/users')
          .set('Authorization', token1)
          .expect(200)
          .expect((res) => {
            expect(res.body).toEqual(
              createdUser2
            );
          });
      });

      it('should return a user', async () => {
        await requestHandle
          .get('/users/1')
          .set('Authorization', token2)
          .expect(200)
          .expect(createdUser);
      });
    });
  });

});