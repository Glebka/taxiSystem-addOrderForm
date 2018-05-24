
var carsList = new CarsList();
var driversList = new DriversList();

carsList.addCar({
    stateCarNumber: "4545445",
    brand: "Nissan",
    gasolineConsumptionRatio: 1.77,
    description: "Краткий комментарий о машине"
});
carsList.addCar({
    stateCarNumber: "4545445",
    brand: "Opel",
    gasolineConsumptionRatio: 1.77,
    description: "Краткий комментарий о машине"
});
carsList.addCar({
    stateCarNumber: "4545445",
    brand: "Opel",
    gasolineConsumptionRatio: 1.77,
    description: "Краткий комментарий о машине"
});
driversList.addDriver({
    name:'Петр',
    surname: 'Иванов',
    phone: '1245757',
    description: "Комментарий о водителе",
    car: carsList.getCar(0)
});
driversList.addDriver({
    name:'Василий',
    surname: 'Жуков',
    phone: '06547851',
    description: "Комментарий о водителе",
    car: carsList.getCar(0)
});
driversList.addDriver({
    name:'Прасковий',
    surname: 'Никитин',
    phone: '06547851',
    description: "Комментарий о водителе",
    car: carsList.getCar(0)
});
driversList.getDriver(0).setStatus(DriverStatus.BUSY);
driversList.getDriver(1).setStatus(DriverStatus.BUSY);
var driversController = new DriversController(null, carsList, driversList);
var addOrderForm = new AddOrderForm($('[data-tab="addOrder"]'));
addOrderForm.setOrdersController(null);
addOrderForm.setDriversController(driversController);
addOrderForm.show();