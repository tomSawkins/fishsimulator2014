// Get signalr.d.ts.ts from https://github.com/borisyankov/DefinitelyTyped (or delete the reference)
/// <reference path="../../Scripts/typings/signalr/signalr.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />

//#region Available Hubs
interface SignalR
{
    // The hub implemented by FishSim2014.Hubs.FishSimHub
    fishSimHub: FishSimHub;
}
//#endregion Available Hubs

//#region Service Contracts

//#region FishSimHub Hub
interface FishSimHub
{
    // This property lets you send messages to the FishSimHub hub.
    server: FishSimHubServer;

    // The functions on this property should be replaced if you want to receive messages from the FishSimHub hub.
    client: FishSimHubClient;
}

interface FishSimHubServer
{

    getStartupTime(): JQueryPromise<string>

    getConfig(): JQueryPromise<ClientConfig>

    marioMan(): JQueryPromise<void>

    updateEnvironment(name: string, health: Health): JQueryPromise<void>
}

interface FishSimHubClient
{

    /**
      * Set this function with a "function(){}" to receive the "marioMan" message from the FishSimHub hub.
      * Contract Documentation: ---
      * @return {void}
      */
    marioMan: () => void;

    /**
      * Set this function with a "function(name: string, health: Health){}" to receive the "updateEnvironment" message from the FishSimHub hub.
      * Contract Documentation: ---
      * @param name {string} 
      * @param health {Health} 
      * @return {void}
      */
    updateEnvironment: (name: string, health: Health) => void;
}

//#endregion FishSimHub Hub

//#endregion Service Contracts


//#region Data Contracts
declare enum Health
{
    Unknown = 0,
    Okay = 1,
    Failing = 2,
}


// Data contract for FishSim2014.Models.ClientConfig
interface ClientConfig
{
    StartupTime: string;
    Environments: Environment[];
}


// Data contract for FishSim2014.Models.Environment
interface Environment
{
    Name: string;
    Health: Health;
}

//#endregion Data Contracts

