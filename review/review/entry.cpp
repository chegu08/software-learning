#include "headers.h"
#include "userModule.h"
#include<bits/stdc++.h>
using namespace std;
start_page::start_page(){
        cout<<"WELCOME TO CRAFTS'N STITCH\n";
        cout<<"Enter 1 to create a new account\n";
        cout<<"Enter 2 to login to existing account\n";
        do{
            cin>>flag;
            switch(flag){
                case 1:{
                Create_Account new_account;
                break;
            }
            // case 2:{
            //     Login_Account cur_account;
            //     break;
            // }
            default:{
                cout<<"Enter a correct option\n";
                break;
            }
            }
        }while(flag>2);
        }
int main()
{
    initializeUser(UserCount);
    start_page a;
    return 0;

}
