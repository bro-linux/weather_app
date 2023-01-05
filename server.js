import getArgs from "./helper/args.js";
import { getError, getSuccess, getHelp, getWeatherInfo } from "./services/log.service.js";
import {saveKeyValue, getKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getWeather, getIcon} from './services/api.service.js';
import dotenv from 'dotenv';

dotenv.config();

const saveToken = async (token) => {
    if (!token.length) {
        getError("Token doesn't exist");
        return
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        getSuccess("Token was saved");
    } catch (error) {
        getError(error.message);
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        getError("City doesn't exist");
        return
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        getSuccess("Token was saved");
    } catch (error) {
        getError(error.message);
    }
}

const getForcast = async  () => {
    try {
        const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
        const response = await  getWeather(city);
        getWeatherInfo(response, getIcon(response.weather[0].icon));
    } catch (error) {
        if(error?.response?.status == 404){
            getError("City not found");
        } else if (error?.response?.status == 401){
            getError("Invalid token");
        } else {
            getError(error.message);
        }
    }
}

const startCli = () => {
    const args = getArgs(process.argv);

    if(args.h) {
        return getHelp();
    }
    if(args.s){
        return saveCity(args.s);
    }
    if(args.t){
       return saveToken(args.t);
    }
    
    getForcast();
}

startCli();