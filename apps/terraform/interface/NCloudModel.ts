export interface NCloudModel {
    name: string;
    serviceType: string;
    getProperties(): { [key: string]: any };
}