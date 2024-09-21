export default class FacetDefinition {
    conflict?: string;
    pointOfView?: string;
    setting?: string;

    constructor(params?: Partial<FacetDefinition>) {
        return Object.assign(this, params);
    }

    isValid(): boolean {
        return isStringValid(this.conflict) &&
            isStringValid(this.pointOfView) &&
            isStringValid(this.setting);
    }
}

function isStringValid(str?: string) {
    return typeof str === 'string' && str.trim() !== '';
}