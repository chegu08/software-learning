#include "headers.h"
#include<bits/stdc++.h>
using namespace std;
void db::insertuser(User& new_user){
    allUsers.push_back(new_user);
}
int Login_Account::check_user_details(string Name,string pw){
    for(User x:user_obj.allUsers){
        //0 indiating a match
        if(Name==x.name&&pw==x.password) return 0;
        //1 indicating incorret password
        else if(Name==x.name&&pw!=x.password) return 1;
    }
    //2 indicating the user does not exist 
    return 2;
}
