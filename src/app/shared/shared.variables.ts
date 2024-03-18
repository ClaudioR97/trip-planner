import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SharedVariables {

    private isTripContVisi: boolean = true;
    private isCityContVisi: boolean = true;
    constructor() {
    }

    isTripsVisible() {
        return this.isTripContVisi;
    }

    setTripContaiVisible(_isTripContVisi: boolean) {
        this.isTripContVisi = _isTripContVisi;
    }

    isCitiesVisible() {
        return this.isCityContVisi;
    }

    setCitiesContVisi(_isCityContVisi: boolean) {
        this.isCityContVisi = _isCityContVisi;
    }
}
