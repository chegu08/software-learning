#include "headers.h"
#include<bits/stdc++.h>
using namespace std;
void db::insertDesigner(designer& new_designer){
    allDesigners.push_back(new_designer);
}
int Login_Account::check_designer_details(string Name,string pw){
    for(User x:designer_obj.allUsers){
        //0 indiating a match
        if(Name==x.name&&pw==x.password) return 0;
        //1 indicating incorret password
        else if(Name==x.name&&pw!=x.password) return 1;
    }
    //2 indicating the user does not exist 
    return 2;
}