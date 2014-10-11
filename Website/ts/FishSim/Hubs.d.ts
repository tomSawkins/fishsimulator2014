// Get signalr.d.ts.ts from https://github.com/borisyankov/DefinitelyTyped (or delete the reference)
/// <reference path="../../Scripts/typings/signalr/signalr.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />

////////////////////
// available hubs //
////////////////////
//#region available hubs

interface SignalR {

    /**
      * The hub implemented by FishSim2014.Hubs.FishSimHub
      */
    fishSimHub : FishSimHub;
}
//#endregion available hubs

///////////////////////
// Service Contracts //
///////////////////////
//#region service contracts

//#region FishSimHub hub

interface FishSimHub {
    
    /**
      * This property lets you send messages to the FishSimHub hub.
      */
    server : FishSimHubServer;

    /**
      * The functions on this property should be replaced if you want to receive messages from the FishSimHub hub.
      */
    client : FishSimHubClient;
}

interface FishSimHubServer {

    /** 
      * Sends a "getStartupTime" message to the FishSimHub hub.
      * Contract Documentation: ---
      * @return {JQueryPromise of string}
      */
    getStartupTime() : JQueryPromise<string>

    /** 
      * Sends a "getConfig" message to the FishSimHub hub.
      * Contract Documentation: ---
      * @return {JQueryPromise of ClientConfig}
      */
    getConfig() : JQueryPromise<ClientConfig>

    /** 
      * Sends a "marioMan" message to the FishSimHub hub.
      * Contract Documentation: ---
      * @return {JQueryPromise of void}
      */
    marioMan() : JQueryPromise<void>
}

interface FishSimHubClient
{

    /**
      * Set this function with a "function(){}" to receive the "marioMan" message from the FishSimHub hub.
      * Contract Documentation: ---
      * @return {void}
      */
    marioMan : () => void;
}

//#endregion FishSimHub hub

//#endregion service contracts



////////////////////
// Data Contracts //
////////////////////
//#region data contracts


/**
  * Data contract for FishSim2014.Models.ClientConfig
  */
interface ClientConfig {
    StartupTime : string;
    Environments : ClientEnvironment[];
}


/**
  * Data contract for FishSim2014.Models.ClientEnvironment
  */
interface ClientEnvironment {
    Name : string;
}

//#endregion data contracts

