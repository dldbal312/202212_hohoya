var commUi = {};

(function(commUi) {
    this.commUi = commUi;
})((function($) {
    commUi.handleTabs = function(options) {
        var option = {
            root : '.listbox',
            tabList : ' > li',
            tab : 'a',
            target : '.tabs_target', 
            className : 'on',
            targetIdIs : true, //탭연결방법 선택 (자동 true, 아이디값매칭 false)
            defaultNum : 0, // 탭에 on처리 (number OR null)
            eventDefault : true // 링크로 넘어가지 않게 하기 (true, false)
        };
        $.extend(option, options);

        var $root = $(option.root);

        $(option.root).each(function(index){
            var $tabroot = $(this)
            var $tabList = $tabroot.find(option.tabList);
            var $tab = $tabList.find(option.tab);
            var $target = $tabroot.next().find(option.target);
            var idx = 0;

            $tab.on('click', function (e) {
                var tabHash = this.hash;
                var idx = $(this).parent().index();
                if(option.eventDefault == true){
                    e.preventDefault();
                }

                //링크
                $tabList.removeClass(option.className);
                $(this).parent().addClass(option.className);

                //탭컨텐츠
                $target.removeClass(option.className)
                if(option.targetIdIs == true){ //자동탭 연결
                    $target.eq(idx).addClass(option.className);
                }else{ //아이디값 매칭으로 탭 연결
                    $(tabHash).addClass(option.className);
                };
            });
            if(option.defaultNum != null){
                $tab.eq(option.defaultNum).trigger('click');
            }
        }); 
    };
    return commUi;
}(jQuery)));

$(document).ready(function(){

    //지역선택
    commUi.handleTabs({
        root : '.localSelect .listbox',
        defaultNum : 0, // number or null        
    })

    //테마선택
    commUi.handleTabs({
        root : '.typeSelect .listbox',
        defaultNum : 1, // number or null        
    })

    //영업시간
    commUi.handleTabs({
        root : '.openSelect .listbox',
        defaultNum : 2, // number or null        
    })
});

