// @ts-ignore
const config = require("./config.json");

/**
 * @typedef {Object} FridgeItem
 * @property {string} bsonID
 * @property {string} product
 * @property {string} code
 * @property {string} name
 * @property {string} image
 * @property {string} storeDate
 * @property {string} lastUseDate
 * @property {string} expiryDate
 * @property {number} stored
 * @property {number} timesUsed
 * @property {boolean} trashed
 */

/**
 * @typedef {Object} Product
 * @property {string} bsonID
 * @property {string} code
 * @property {string} name
 * @property {string} image
 * @property {string} mainCategory
 * @property {double} averageExpiryDays
 * @property {number} numExpirySamples
 * @property {string} api
 * @property {any} product
 * @property {string} checkDate
 */

/**
 * @typedef {Object} Fridge
 * @property {string} bsonID
 * @property {string} label
 * @property {string} lastUse
 * @property {FridgeItem[]} [items]
 */

export default class FridgeAPI {
	/**
	 * @param {string} id
	 * @returns {Promise<Fridge | undefined>}
	 */
	static async getFridge(id) {
		return await this._get(
			"/api/fridge/" + encodeURIComponent(id),
			"fetching fridge " + id);
	}
	/**
	 * @param {string[]} ids
	 * @returns {Promise<Fridge[] | undefined>}
	 */
	static async getFridges(ids) {
		return await this._get(
			"/api/fridges?ids=" + encodeURIComponent(ids.join(",")),
			"fetching all fridges");
	}

	/**
	 * @param {string} code
	 * @param {boolean} [force]
	 * @returns {Promise<Product | undefined>}
	 */
	static async scan(code, force) {
		return await this._get(
			"/api/scan?code=" + encodeURIComponent(code) + (force ? "&force=true" : ""),
			"scanning code " + code);
	}

	static async _post(endpoint, body, msg) {
		return await this._http("POST", endpoint, body, msg);
	}

	static async _get(endpoint, msg) {
		return await this._http("GET", endpoint, undefined, msg);
	}

	static async _http(method, endpoint, body, msg) {
		try {
			var args = {
				method: method,
				headers: {
					"User-Agent": "FoodInventory-react v0.1.0"
				}
			};
			if (body)
				args.body = body;

			var data = await fetch(config.serverURL + endpoint, args);

			if (!data.ok) {
				if (data.status == 404) {
					return undefined;
				} else {
					throw new Error("Got invalid status code " + data.status + " when " + msg + ": " + await data.text());
				}
			}

			return await data.json();
		}
		catch (e) {
			throw new Error("Failed " + msg + ": " + (e.msg || e.message || e.toString()));
		}
	}
}