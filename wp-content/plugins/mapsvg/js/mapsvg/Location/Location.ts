import { LocationAddress } from "./LocationAddress";
import { MapSVG } from "../Core/globals.js";
import { Marker } from "../Marker/Marker";
import { CustomObject } from "../Object/CustomObject";

export class ScreenPoint {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class SVGPoint {
    x: number;
    y: number;
    constructor(
        x: number | string | { x: number | string; y: number | string },
        y?: number | string
    ) {
        let _x, _y;
        if (typeof x === "object") {
            if (x.x && x.y) {
                _x = parseFloat(x.x + "");
                _y = parseFloat(x.y + "");
            } else {
                console.error("MapSVG: incorrect format of {x, y} object for SVGPoint.");
                _x = 0;
                _y = 0;
            }
        } else {
            _x = parseFloat(x + "");
            _y = parseFloat(y + "");
        }
        this.x = _x;
        this.y = _y;
    }

    toString() {
        return this.x + "," + this.y;
    }
}

export class GeoPoint {
    lat: number;
    lng: number;
    constructor(
        lat: number | string | { lat: number | string; lng: number | string },
        lng?: number | string
    ) {
        let _lat, _lng;
        if (typeof lat === "object") {
            if (lat.lat && lat.lng) {
                _lat = parseFloat(lat.lat + "");
                _lng = parseFloat(lat.lng + "");
            } else {
                console.error("MapSVG: incorrect format of {lat, lng} object for GeoPoint.");
                _lat = 0;
                _lng = 0;
            }
        } else {
            _lat = parseFloat(lat + "");
            _lng = parseFloat(lng + "");
        }
        this.lat = _lat;
        this.lng = _lng;
    }

    toString() {
        return this.lat + "," + this.lng;
    }
}

export interface LocationOptionsInterface {
    img: string;
    object?: CustomObject;
    svgPoint?: SVGPoint;
    geoPoint?: GeoPoint;
    address?: LocationAddress;
}

/**
 * Location class. Contains lat/lon, x/y coordinates, image, address and marker.
 * @param {object} options
 * @param {MapSVG.Map} mapsvg
 * @constructor
 *
 * @example
 * var location = new MapSVG.Location({
 *   geoPoint: {
 *     lat: 55.22,
 *     lng: 64.12,
 *   },
 *   img: "/path/to/image.png"
 *  });
 *
 * var marker = new MapSVG.Marker({
 *   location: location,
 *   mapsvg: mapsvgInstance
 * });
 *
 */
export class Location {
    img: string;
    imagePath: string;
    object?: CustomObject;
    address?: LocationAddress;
    marker?: Marker;
    geoPoint?: GeoPoint;
    svgPoint?: SVGPoint;

    constructor(options: LocationOptionsInterface) {
        this.update(options);
    }

    update(options: LocationOptionsInterface): void {
        if (options.object) {
            this.setObject(options.object);
        }
        if (options.img) {
            this.setImage(options.img);
        }
        if (options.address) {
            this.setAddress(options.address);
        }
        if (options.svgPoint) {
            this.setSvgPoint(options.svgPoint);
        }
        if (options.geoPoint) {
            this.setGeoPoint(options.geoPoint);
        }
    }

    /**
     * Sets parent object
     */
    setObject(object: CustomObject): void {
        this.object = object;
    }
    /**
     * Sets image of the location
     * @param {string} imgUrl - URL of the image
     * @private
     */
    setImage(imgUrl: string): void {
        if (typeof imgUrl !== "string") {
            return;
        }
        let src = imgUrl.split("/").pop();
        if (imgUrl.indexOf("uploads") !== -1) {
            src = "uploads/" + src;
        }
        this.img = src;
        this.imagePath = this.getImageUrl();
        this.marker && this.marker && this.marker.setImage(this.imagePath);
    }

    /**
     * Returns full image path
     * @return string URL path
     */
    getImageUrl(): string {
        if (this.img && this.img.indexOf("uploads/") === 0) {
            return MapSVG.urls.uploads + "markers/" + this.img.replace("uploads/", "");
        } else {
            return MapSVG.urls.root + "markers/" + (this.img || "_pin_default.png");
        }
    }

    setAddress(address: { [key: string]: any }): void {
        this.address = new LocationAddress(address);
    }

    /**
     * Sets SvgPoint of the location (x/y coordinates)
     * @returns void
     */
    setSvgPoint(svgPoint: SVGPoint | { x: number; y: number }): void {
        this.svgPoint = svgPoint instanceof SVGPoint ? svgPoint : new SVGPoint(svgPoint);
        if (this.marker) {
            this.marker.setSvgPointFromLocation();
        }
    }

    /**
     * Sets GeoPoint of the location (lat/lng coordinates)
     * @returns void
     */
    setGeoPoint(geoPoint: GeoPoint | { lat: number; lng: number }): void {
        this.geoPoint = geoPoint instanceof GeoPoint ? geoPoint : new GeoPoint(geoPoint);
        if (this.marker) {
            this.marker.setSvgPointFromLocation();
        }
    }

    /**
     * Returns full marker image URL
     * @returns {string} image URL
     */
    getMarkerImage(): string {
        if (this.img && this.img.indexOf("uploads/") === 0) {
            return MapSVG.urls.uploads + "markers/" + this.img.replace("uploads/", "");
        } else {
            return MapSVG.urls.root + "markers/" + (this.img || "_pin_default.png");
        }
    }

    /**
     * Returns only essential data of the location
     * @returns {img: string, geoPoint?: {lat: number, lng: number}, svgPoint?: {x: number, y: number}, address: LocationAddress}
     */
    getData(): {
        img: string;
        imagePath: string;
        markerImagePath: string;
        geoPoint?: { lat: number; lng: number };
        svgPoint?: { x: number; y: number };
        address: LocationAddress;
    } {
        const data: {
            img: string;
            imagePath: string;
            markerImagePath: string;
            geoPoint?: { lat: number; lng: number };
            svgPoint?: { x: number; y: number };
            address: LocationAddress;
        } = {
            img: this.img,
            imagePath: this.imagePath,
            markerImagePath:
                this.marker && this.marker.object
                    ? this.marker.object.getMarkerImage()
                    : this.imagePath,
            address: this.address,
        };
        if (this.geoPoint) {
            data.geoPoint = { lat: this.geoPoint.lat, lng: this.geoPoint.lng };
        }
        if (this.svgPoint) {
            data.svgPoint = { x: this.svgPoint.x, y: this.svgPoint.y };
        }
        return data;
    }
}
