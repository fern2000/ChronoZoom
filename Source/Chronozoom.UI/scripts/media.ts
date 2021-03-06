/// <reference path='uiloader.ts'/>
/// <reference path='../ui/media/bing-mediapicker.ts'/>
/// <reference path='typings/jquery/jquery.d.ts'/>

module CZ {
    export module Media {

        export interface MediaInfo {
            uri: string;
            mediaType: string;
            mediaSource: string;
            attribution: string;
        }

        export interface MediaPickerInfo {
            title: string;
            iconUrl: string;
            order: number;
            setup: (...args: any[]) => void;
        }

        var _mediaPickers: any = {};
        var _mediaPickersViews: any = {};

        declare export var mediaPickers: any;
        declare export var mediaPickersViews: any;
        Object.defineProperties(CZ.Media, {
            mediaPickers: {
                get: () => {
                    return _mediaPickers;
                }
            },
            mediaPickersViews: {
                get: () => {
                    return _mediaPickersViews;
                }
            }
        });

        export function initialize() {
            // TODO: Register media pickers. The order is essential for MediaList.
            registerMediaPicker(
                "bing",
                "/images/media/bing-import-50x150.png",
                "/ui/media/bing-mediapicker.html",
                CZ.Media.BingMediaPicker
            );
        }

        export function registerMediaPicker(title: string, iconUrl: string, viewUrl: string, type: any, selector?: string): JQueryPromise {
            var order = Object.keys(_mediaPickers).length;
            var setup = type.setup;
            selector = selector || "$('<div></div>')";
            _mediaPickers[title] = {};

            return CZ.UILoader.loadHtml(selector, viewUrl).always(view => {
                _mediaPickersViews[title] = view;
                _mediaPickers[title] = <MediaPickerInfo> {
                    title: title,
                    iconUrl: iconUrl,
                    order: order,
                    setup: setup
                };
            });
        }
    }
}