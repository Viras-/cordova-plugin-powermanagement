/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var oDisplayRequest = null;

module.exports = {
    /**
     * Acquire a new wake-lock (keep device awake)
     *
     * @param successCallback function to be called when the wake-lock was acquired successfully
     * @param errorCallback function to be called when there was a problem with acquiring the wake-lock
     */
    acquire: function (successCallback, errorCallback, runLockScreen) {
        if (oDisplayRequest === null) {
            try {
                oDisplayRequest = new Windows.System.Display.DisplayRequest;
            } catch (e) {
                errorCallback("displayRequest object creation error: " + e.message);
            }
        }

        if (oDisplayRequest) {
            try {
                // if successful the screen is guaranteed not to turn off automatically due to user inactivity.
                oDisplayRequest.requestActive();
                successCallback();
            } catch (e) {
                errorCallback("displayRequest.requestActive, error: " + e.message);
            }
        }
    },

    /**
     * Release the wake-lock
     *
     * @param successCallback function to be called when the wake-lock was released successfully
     * @param errorCallback function to be called when there was a problem while releasing the wake-lock
     */
    release: function (successCallback, errorCallback) {

        if (oDisplayRequest) {
            try {
                // ifIf successful, the screen might be turned off automatically due to a user inactivity,
                // depending on the power policy settings of the system. The requestRelease method throws an exception 
                // if it is called before a successful requestActive call on this object.
                oDisplayRequest.requestRelease();
                successCallback();
            } catch (e) {
                errorCallback("displayRequest.requestRelease, error: " + e.message);
            }
        }
    },

    /**
     * Enable or disable releasing of the wakelock on pause
     *
     * @param enabled boolean - true to enable releasing of wakelock on pause, or false to disable
     * @param successCallback
     * @param errorCallback
     */
    setReleaseOnPause: function (successCallback, errorCallback, enabled) {
        // not supported for windows
        successCallback();
    },

    /**
     * Acquire a partial wake-lock, allowing the device to dim the screen
     *
     * @param successCallback function to be called when the wake-lock was acquired successfully
     * @param errorCallback function to be called when there was a problem with acquiring the wake-lock
     */
    dim: function (successCallback, errorCallback) {
        // not supported for windows
        successCallback();
    }
}; // exports
require("cordova/exec/proxy").add("PowerManagement", module.exports);
