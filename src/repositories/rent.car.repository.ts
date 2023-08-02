import { Firestore } from '@google-cloud/firestore';
import { BillingInfo } from 'src/entity/billing.info.entity';
import { Car } from 'src/entity/car.entity';
import { FirestoreInstance } from './config/FirestoreInstance';

export class RentCarRepository {
  private readonly nameCollection: string = 'car';
  private readonly billingCollection: string = 'billing-car';
  private firebaseDb: Firestore = FirestoreInstance.getInstance();

  constructor() {}

  async listAllCar(): Promise<Car[]> {
    const docRef = this.firebaseDb.collection(this.nameCollection);
    const cars = await docRef.get();

    if (cars.empty) {
      return null;
    }
    return cars.docs.map((car) => car.data() as Car);
  }

  async getListBilling(): Promise<BillingInfo[]> {
    const docRef = this.firebaseDb.collection(this.billingCollection);
    const billings = await docRef.get();

    if (billings.empty) {
      return null;
    }
    return billings.docs.map((billing) => billing.data() as BillingInfo);
  }

  async getCarByCode(registerCode: number): Promise<Car> {
    const docRef = this.firebaseDb
      .collection(this.nameCollection)
      .where('registerCode', '==', registerCode);
    const car = await docRef.get();
    if (car.empty) {
      return null;
    }
    return car.docs[0].data() as Car;
  }

  async checkIfUserRented(email: string): Promise<Car> {
    const docRef = this.firebaseDb
      .collection(this.nameCollection)
      .where('rentBy', '==', email);
    const car = await docRef.get();
    if (car.empty) {
      return null;
    }
    return car.docs[0].data() as Car;
  }

  async getRentedDetail(id: number): Promise<BillingInfo> {
    const docRef = this.firebaseDb
      .collection(this.billingCollection)
      .where('id', '==', `b${id}`);
    const biliing = await docRef.get();
    if (biliing.empty) {
      return null;
    }
    return biliing.docs[0].data() as BillingInfo;
  }

  async getCarDetail(id: string): Promise<Car> {
    const docRef = this.firebaseDb
      .collection(this.nameCollection)
      .where('registerCode', '==', id);
    const car = await docRef.get();
    if (car.empty) {
      return null;
    }
    return car.docs[0].data() as Car;
  }

  async getListAvailable(): Promise<Car[]> {
    const docRef = this.firebaseDb
      .collection(this.nameCollection)
      .where('available', '==', true);
    const cars = await docRef.get();

    if (cars.empty) {
      return null;
    }
    return cars.docs.map((c) => c.data() as Car);
  }

  async rentOrGiveBackCar(car: Car): Promise<any> {
    const docRef = await this.firebaseDb.collection(this.nameCollection);

    docRef.doc(car.id.toString()).update(JSON.parse(JSON.stringify(car)));
  }

  async createBillingRentCar(billing: BillingInfo): Promise<any> {
    const docRef = await this.firebaseDb.collection(this.billingCollection);
    docRef.doc(billing.id.toString()).set(billing);
  }

  async createCar(payload: Car): Promise<void> {
    await this.firebaseDb
      .collection(this.nameCollection)
      .doc(payload.id.toString())
      .set(payload);
  }
}
