const tools = require('./tools.js'),
    constants_type = require('./ecovacsConstants_950type.js');

class VacBotCommand_950type {
    constructor(name, args = {}) {
        this.name = name;
        this.args = Object.assign(args, { 'id': getReqID() });
    }

    toString() {
        return this.command_name() + ' command';
    }

    command_name() {
        return this.name.toLowerCase();
    }
}

class Clean extends VacBotCommand_950type {
    constructor(mode = 'auto', action = 'start', kwargs = {}) {
        let initCmd = {
            'type': constants_type.CLEAN_MODE_TO_ECOVACS[mode],
            'speed': constants_type.FAN_SPEED_TO_ECOVACS['normal'],
            'act': constants_type.CLEAN_ACTION_TO_ECOVACS[action]
        };
        for (let key in kwargs) {
            if (kwargs.hasOwnProperty(key)) {
                initCmd[key] = kwargs[key];
            }
        }
        tools.envLog('initCmd %s', initCmd);
        super('clean', initCmd);
    }
}

function getReqID(customid = '0') {
    // Generate a somewhat random string for request id, with minium 8 chars. Works similar to ecovacs app
    // This is required for the Ozmo 930
    if (customid !== '0') {
        rtnval = customid; // return provided id as string
    } else {
        rtnval = Math.floor(Math.random() * 99999999) + 1;
    }
    return rtnval.toString(); // return as string
}

class Edge extends Clean {
    constructor() {
        super('edge', 'start');
    }
}

class Spot extends Clean {
    constructor() {
        super('spot', 'start', {'content':'0,0'}); 
    }
}

class Pause extends VacBotCommand_950type {
    constructor() {
        super('clean', {'act': 'pause'});
    }
}

class Resume extends VacBotCommand_950type {
    constructor() {
        super('clean', {'act': 'resume'});
    }
}

class Stop extends VacBotCommand_950type {
    constructor() {
        super('clean',  {'act': 'stop'});
    }
}

class SpotArea extends Clean {
    constructor(action = 'start', area = '', cleanings = 1) {
        if (area !== '') {
            let cleaningAsNumber = parseInt(cleanings);
            super('spotArea', action, {'content': area, 'count': cleaningAsNumber});
        }
    }
}

class CustomArea extends Clean {
    constructor(action = 'start', map_position = '', cleanings = 1) {
        if (map_position !== '') {
            let cleaningAsNumber = parseInt(cleanings);
            super('customArea', action, {'content': map_position, 'count': cleaningAsNumber});
        }
    }
}

class Charge extends VacBotCommand_950type {
    constructor() {
        super('charge', {'act': constants_type.CHARGE_MODE_TO_ECOVACS['return']}
        );
    }
}

class GetDeviceInfo extends VacBotCommand_950type {
    constructor() {
        super('getDeviceInfo');
    }
}

class Relocate extends VacBotCommand_950type {
    constructor() {
        super('setRelocationState', { "mode": "manu" });
    }
}

class GetCleanState extends VacBotCommand_950type {
    constructor() {
        super('getCleanInfo');
    }
}

class GetChargeState extends VacBotCommand_950type {
    constructor() {
        super('getChargeState');
    }
}

class GetBatteryState extends VacBotCommand_950type {
    constructor() {
        super('getBattery');
    }
}

class GetLifeSpan extends VacBotCommand_950type {
    constructor(component) {
        super('getLifeSpan', [constants_type.COMPONENT_TO_ECOVACS[component]]);
    }
}

class SetTime extends VacBotCommand_950type {
    constructor(timestamp, timezone) {
        super('setTime', {
            'time': {
                't': timestamp,
                'tz': timezone
            }
        });
    }
}

class GetCleanSpeed extends VacBotCommand_950type {
    constructor(component) {
        super('getSpeed');
    }
}

class GetError extends VacBotCommand_950type {
    constructor(component) {
        super('getError');
    }
}

class SetCleanSpeed extends VacBotCommand_950type {
    constructor(level) {
        if (constants_type.FAN_SPEED_TO_ECOVACS.hasOwnProperty(level)) {
            level = constants_type.FAN_SPEED_TO_ECOVACS[level];
        }
        super('setSpeed', {
            'speed': level
        });
    }
}

class SetWaterLevel extends VacBotCommand_950type {
    constructor(level) {
        if (constants_type.WATER_LEVEL_TO_ECOVACS.hasOwnProperty(level)) {
            level = constants_type.WATER_LEVEL_TO_ECOVACS[level];
        }
        super('setWaterInfo', {
            'amount': level
        });
    }
}

class GetWaterInfo extends VacBotCommand_950type {
    constructor() {
        super('getWaterInfo');
    }
}

class GetPosition extends VacBotCommand_950type {
    constructor() {
        super('getPos', ["chargePos", "deebotPos"]);
    }
}

class PlaySound extends VacBotCommand_950type {
    constructor(sid = 0) {
        let sidAsNumber = parseInt(sid);
        super('playSound', {'count': 1, 'sid': sidAsNumber});
    }
}

class GetNetInfo extends VacBotCommand_950type {
    constructor() {
        super('getNetInfo');
    }
}
class GetCleanSum extends VacBotCommand_950type {
    constructor() {
        super('getTotalStats');
    }
}

class GetMaps extends VacBotCommand_950type {
    constructor() {
        super('getCachedMapInfo');
    }
}

class GetMapSet extends VacBotCommand_950type {
    constructor(mapID, type='ar') { //default type is spotAreas
        super('getMapSet', {'mid': mapID, 'type': type});
    }
}
class GetMapSpotAreas extends GetMapSet {
    constructor(mapID) {
        super(mapID, 'ar');
    }
}
class GetMapVirtualWalls extends GetMapSet {
    constructor(mapID) {
        super(mapID, 'vw');
    }
}
class GetMapNoMopZones extends GetMapSet {
    constructor(mapID) {
        super(mapID, 'mw');
    }
}
class GetMapSubSet extends VacBotCommand_950type {
    constructor(mapID, mapSubSetID, type='ar') { //default type is spotAreas
        super('getMapSubSet', {'mid': mapID, 'mssid': mapSubSetID, 'type': type});
    }
}
class GetMapSpotAreaInfo extends GetMapSubSet {
    constructor(mapID, mapSubSetID) {
        super(mapID, mapSubSetID, 'ar');
    }
}
class GetMapVirtualWallInfo extends GetMapSubSet {
    constructor(mapID, mapSubSetID) {
        super(mapID, mapSubSetID, 'vw');
    }
}
class GetMapNoMopZoneInfo extends GetMapSubSet {
    constructor(mapID, mapSubSetID) {
        super(mapID, mapSubSetID, 'mw');
    }
}

class GetSleepStatus extends VacBotCommand_950type {
    constructor() {
        super('getSleep');
    }
}

module.exports.Clean = Clean;
module.exports.Edge = Edge;
module.exports.Spot = Spot;
module.exports.SpotArea = SpotArea;
module.exports.CustomArea = CustomArea;
module.exports.Stop = Stop;
module.exports.Pause = Pause;
module.exports.Resume = Resume;
module.exports.Charge = Charge;
module.exports.GetDeviceInfo = GetDeviceInfo;
module.exports.GetCleanState = GetCleanState;
module.exports.GetChargeState = GetChargeState;
module.exports.GetBatteryState = GetBatteryState;
module.exports.GetLifeSpan = GetLifeSpan;
module.exports.GetPosition = GetPosition;
module.exports.SetTime = SetTime;
module.exports.GetCleanSpeed = GetCleanSpeed;
module.exports.SetCleanSpeed = SetCleanSpeed;
module.exports.GetWaterInfo = GetWaterInfo;
module.exports.SetWaterLevel = SetWaterLevel;
module.exports.PlaySound = PlaySound;
module.exports.Relocate = Relocate;
module.exports.GetMaps = GetMaps;
module.exports.GetMapSet = GetMapSet;
module.exports.GetError = GetError;
module.exports.GetNetInfo = GetNetInfo;
module.exports.GetSleepStatus = GetSleepStatus;
module.exports.GetCleanSum = GetCleanSum;
module.exports.GetMapSpotAreas = GetMapSpotAreas;
module.exports.GetMapVirtualWalls = GetMapVirtualWalls;
module.exports.GetMapNoMopZones = GetMapNoMopZones;
module.exports.GetMapSpotAreaInfo = GetMapSpotAreaInfo;
module.exports.GetMapVirtualWallInfo = GetMapVirtualWallInfo;
module.exports.GetMapNoMopZoneInfo = GetMapNoMopZoneInfo;