#ifndef START_PAGE
#define START_PAGE
inline class Create_Account{
    public:
    int choice;
    void Create_User();
    void Create_designer();
    Create_Account(){
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
                break;
            }
            default:{
                cout<<"Enter a correct value";
                break;
            }
        }
        }while(choice>3);
    }
};
inline void Create_Account::Create_User(){
    cout<<"User created Succesfully\n";
}
inline void Create_Account::Create_designer(){
    cout<<"Designer created succesfully\n";
}
#endif