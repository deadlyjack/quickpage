/// <reference path="../node_modules/@types/ace/"/>

interface Router{
  add(path: String, callback: ()=>void): void;
  listen():void;
  navigate(url: String):void;
  on(event: "nagivate", listener: (url:String)=>void): void;
  off(event: "nagivate", listener: (url:String)=>void): void;
  onnavigate(url: String): void;
}

declare const app: HTMLDivElement;