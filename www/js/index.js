/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {

        this.receivedEvent('deviceready');

         var onSuccess = function(position) {
                 window.localStorage.setItem('long',position.coords.longitude);
                 window.localStorage.setItem('lat',position.coords.latitude);
            };
            function onError(error) {
                alert('code: '    + error.code    + '\n' +
                    'message: ' + error.message + '\n');
            }
         navigator.geolocation.getCurrentPosition(onSuccess, onError);
     },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

    }
};

$(document).ready(function(){
    var lat=window.localStorage.getItem('lat');
    var long=window.localStorage.getItem('long');
    var radius=1;
    var type='atm';
     $.ajax({
           type       : "POST",
           url        : "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+long+"&radius="+radius+"000&type="+type+"&key=AIzaSyCFFtyIJVFWHjUJl_GiMvBTMcrzvQank6w",
           crossDomain: true,
            dataType   : 'json',
            success    : function(response) {
            $.each( response.results, function( key, value ) {
                        $('.content').append('<li>'+value.name +''+'</li>');
            });

            },
            error: function() {
             alert('Something went wrong :(');
             }
            });
        })
app.initialize();

