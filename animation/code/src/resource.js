var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    runnerPlist: "res/running.plist",
    background: "res/bgLayer.jpg"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}