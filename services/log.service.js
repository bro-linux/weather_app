import chalk from "chalk";
import dedent from "dedent-js";

const getError = (error) => {
    console.log(chalk.bgRed("Error") + " " + error);
}

const getSuccess = (message) => {
    console.log(chalk.bgGreen("Success") + " " + message);
}

const getHelp = () => {
    console.log(dedent`
    ${chalk.bgCyan("HELP")}
    -s [City] search city
    -h help
    -t [API_KEY] saving token
    `);
}

const getWeatherInfo = (response, icon) => {
    console.log(dedent`
    ${chalk.bgYellowBright("WEATHER")} City weather ${response.name}
    ${icon} ${response.weather[0].description}
    TEMP ${response.main.temp} (feels like ${response.main.feels_like})
    Humidity ${response.main.humidity}%
    Wind speed ${response.wind.speed}
    `);
}

export {
    getError,
    getSuccess,
    getHelp,
    getWeatherInfo
}
