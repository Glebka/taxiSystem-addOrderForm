class MapPopup {
    constructor() {                
        this._currentMarker = null;
        this._currentAddress = null;
    }

    _initPopup() {
        $('.mapContainer').remove();
        $('#mapPopup').tmpl().appendTo('body');
        this._mapPopupelement = $('.mapContainer');
        this._mapPopupelement.modal({
            onVisible: (function(){
                this._map.invalidateSize();
            }).bind(this),
            onHidden: (function(){
                if(this._currentMarker) {
                    this._currentAddress = {};
                    this._currentMarker.remove();
                    this._currentMarker = null;
                    this._mapPopupelement.find(".address").html("Пожалуйста, выберите адрес.");
                }
            }).bind(this)            
        });
        this._mapPopupelement.find(".header").click((function(){
            console.log(this._currentAddress);
        }).bind(this));
    }

    _initMap() {
        this._map = L.map('map').setView([46.4880795, 30.7410718], 18);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this._map);
        this._map.on("click", this._onMapClick.bind(this));
    }

    show(acceptCallback, address) {
        this._initPopup();
        this._initMap();
        if (address && address.isValid()) {
            this._currentAddress = address;
            this._currentMarker = L.marker(address.getLatLng()).addTo(this._map);
            this._map.setView(address.getLatLng(), 18);
            this._mapPopupelement.find(".address").html(address.getText());

        }
        this._mapPopupelement
            .modal("setting", "onApprove", () => {
                acceptCallback(this._currentAddress);
            })
            .modal("show");
    }

    _onMapClick(e) {
        if(!this._currentMarker) {
            this._currentMarker = L.marker(e.latlng).addTo(this._map);
        } else {
            this._currentMarker.setLatLng(e.latlng);
        }        
        GeoService.getAddress(e.latlng, (function(addressText){
            this._currentAddress = new Address(addressText, e.latlng.lat, e.latlng.lng);
            this._mapPopupelement.find(".address").html(addressText);
        }).bind(this));
    }
}