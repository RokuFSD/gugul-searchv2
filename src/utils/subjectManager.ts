import { Subject } from "@reactivex/rxjs/dist/package";

export default class SubjectManager {
  private subject = new Subject();

  getSubject() {
    return this.subject.asObservable();
  }

  setSubject(value: unknown) {
    this.subject.next(value);
  }
}
