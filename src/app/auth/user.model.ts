

export class User
{
    constructor(public email : string,
        public id : string,
        private _token : string,
        private _tokenExpirationDate : Date)
    {

    }
    get token() // getter function to show the value only, cannot edit
    {
        if(!this._tokenExpirationDate || new Date > this._tokenExpirationDate)
        {
            return null; // returning null if token is expired.
        }
        return this._token;
    }
}