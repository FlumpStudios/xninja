import * as config from "./config.js";

export const uiUpdateLoop = (runtime) => {
    const starCount = runtime.levelInstance.getStarcount();
    runtime.objects.StarsCount_spritefont.getFirstInstance().text = (starCount >= config.INFINATE_STAR_AMOUNT) ? "INF" : starCount.toString();
}