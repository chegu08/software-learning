#include "headers.h"
#include<bits/stdc++.h>
using namespace std;
 Create_Account::Create_Account(){
        cout<<"Enter 1 to create a user account\n";
        cout<<"Enter 2 to create a designer account\n";
        cout<<"Enter 3 to go to start page\n";
        cin>>choice;
        do{
            switch(choice){
            case 1:{
                Create_User();
                break;
            }
            case 2:{
                Create_designer();
                break;
            }
            case 3:{
                start_page obj;
                break;
            }
            default:{
                cout<<"Enter a correct value";
                break;
            }
        }
        }while(choice>3);
    }
void Create_Account::Create_User(){
    cout<<"User created Succesfully\n";
}
void Create_Account::Create_designer(){
    cout<<"Designer created succesfully\n";
}
