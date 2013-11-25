/*
 * Copyright 2013 Wolfgang Koller
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Phone.Shell;
using WPCordovaClassLib.Cordova;
using WPCordovaClassLib.Cordova.Commands;
using WPCordovaClassLib.Cordova.JSON;

namespace Cordova.Extension.Commands
{
    class PowerManagement : BaseCommand
    {
        /// <summary>
        /// acquires the stay awake lock by disabling UserIdleDetection mode and optionally disable the ApplicationIdleDetection
        /// </summary>
        /// <param name="options">acquire options</param>
        /// exec(win, fail, 'PowerManagement', 'acquire', [runLockScreen]);
        public void acquire(string options) {
            string[] optionStrings = JsonHelper.Deserialize<string[]>(options);
            bool runLockScreen = false;
            bool.TryParse(optionStrings[0], out runLockScreen);

            PhoneApplicationService.Current.UserIdleDetectionMode = IdleDetectionMode.Disabled;

            // check if we should continue running within the lock screen
            if (runLockScreen)
            {
                PhoneApplicationService.Current.ApplicationIdleDetectionMode = IdleDetectionMode.Disabled;
            }
            
            DispatchCommandResult();
        }

        /// <summary>
        /// releases the stay awake lock
        /// </summary>
        /// <param name="options">release options</param>
        /// exec(win, fail, 'PowerManagement', 'release', []);
        public void release(string options)
        {
            PhoneApplicationService.Current.UserIdleDetectionMode = IdleDetectionMode.Enabled;
            
            DispatchCommandResult();
        }

    }
}
