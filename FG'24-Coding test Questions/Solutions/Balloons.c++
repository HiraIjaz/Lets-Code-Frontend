#include <iostream>
#include <fstream>
#include <unordered_map>
#include <string>
#include <exception>

using namespace std;

void countBalloons(const string& pattern, int start, int end) {
    if (start > end) {
        cout << "Start index should not be greater than end index" << endl;
        return;
    }

    int patternLength = pattern.length();
    unordered_map<char, int> balloonCount;

    for (int i = start; i <= end; ++i) {
        char c = pattern[i % patternLength];
        ++balloonCount[c];
    }

    cout<< 'b'<<balloonCount.at('b')<<'o'<<balloonCount.at('o')<<'w'<<balloonCount.at('w');
    return;
}

bool readInputFromFile(const string& filename, string& pattern, int& start, int& end) {
    ifstream inputFile(filename);
    if (!inputFile.is_open()) {
        cout << "Failed to open file." << endl;
        return false;
    }

    try {
        getline(inputFile, pattern);
        inputFile >> start;
        inputFile >> end;
        if (inputFile.fail()) {
            throw runtime_error("File format incorrect or read error occurred.");
        }
    } catch (const exception& e) {
        cout << "Error: " << e.what() << endl;
        inputFile.close();
        return false;
    }

    inputFile.close();
    return true;
}

int main() {
    string pattern;
    int start, end;

    if (!readInputFromFile("balloons.txt", pattern, start, end)) {
        return 1;
    }

    countBalloons(pattern, start, end);

    return 0;
}
